import { db } from "@/configs/db";
import { inngest } from "./client";
import { USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const CreateNewUser = inngest.createFunction(
  { id: "create-user" },
  { event: "user.create" },
  async ({ event, step }) => {
    const { user } = event.data;
    // Get Event Data
    const result = await step.run(
      "Check User and create if Not in DB",
      async () => {
        // check is user already exists
        const result = await db
          .select()
          .from(USER_TABLE)
          .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

        console.log(result);
        if (result?.length == 0) {
          // if not, then add to DB
          const userRes = await db
            .insert(USER_TABLE)
            .values({
              name: user?.fullName,
              email: user?.primaryEmailAddress?.emailAddress,
            }).returning({ id: USER_TABLE.id });
            return userRes;
        }
        return result;
      }
    );
    return "Success";

    // Step to send welcome email notification

    // step to send email notification after 3 days once per join it
  }
);
