"use client"
import axios  from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FlashCardItem from './_components/FlashCardItem';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


const Flashcard = () => {
  const { courseId } = useParams();
  const [flashCards, setFlashcards] = useState();
  const [isFlipped, setIsFlipped] = useState();
  const [api, setApi] = useState();

  useEffect(()=>{
      GetFlashCards();
  },[])

  useEffect(()=>{
       if(!api) 
       {
        return;
       }
       api.on('select',()=>{
          setIsFlipped(false)
       })
  },[api])
  const GetFlashCards = async()=>{
      const result = await axios.post('/api/study-type', {
         courseId: courseId,
         studyType: 'Flashcard'
      });
      setFlashcards(result?.data);
      console.log('Flashcard', result?.data);
  }

  const handleClick = ()=> {
     setIsFlipped(!isFlipped);
  }

  return (
    <div>
       <h2 className='font-bold text-2xl'>
          Flashcard
       </h2>
       <p>FlashCards: The Ultimate Tool to Lock in concepts!</p>
       <div className='mt-10'> 
       <Carousel setApi={setApi}>
                <CarouselContent>
                   {
                    flashCards?.content&&flashCards.content
                    ?.map((flashcard, index)=>(
                      <CarouselItem key={index} className="flex items-center justify-center">
                          <FlashCardItem handleClick={handleClick} isFlipped={isFlipped} flashcard={flashcard}/>
                      </CarouselItem>
                    ))
                   }
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
        </Carousel>

       </div>
    </div>
  )
}

export default Flashcard

