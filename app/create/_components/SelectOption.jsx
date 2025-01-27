import { Button } from '@/components/ui/button';
import Image from 'next/image'
import React, { useState } from 'react'

const SelectOption = ({ selectedStudyType }) => {
    const Options = [
        {
            name: 'Exam',
            icon: '/exam_1.png'
        },
        {
            name: 'Job Interview',
            icon: '/job.png'
        },
        {
            name: 'Practice',
            icon: '/practice.png'
        },
        {
            name: 'Coding Prep',
            icon: '/code.png'
        },
        {
            name: 'Other',
            icon: '/Knowledge.png'
        }
    ]

    const [selectedOption, setselectedOption] = useState();
  return (
    <div>
         <h2 className='text-center mb-2 text-lg'>For which you want to create your personal Study Material</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-5'>
             {
                Options.map((option, index)=>(
                     <div key={index} className={`p-4 flex flex-col items-center justify-center border rounded-xl hover:border-primary cursor-pointer ${option.name==selectedOption && 'border-primary'}`} onClick={()=>{setselectedOption(option.name); selectedStudyType(option.name)}}>
                         <Image src={option.icon} alt={option.name} width={50} height={50}/>
                         <h2 className=' text-sm mt-2'>{option.name}</h2>
                     </div>
                ))
             }
        </div>

    </div>
  )
}

export default SelectOption