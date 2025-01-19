"use client"
import DashboardHeader from '@/app/dashboard/_components/DashboardHeader';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CourseIntroCard from './_components/CourseIntroCard';
import StudyMaterial from './_components/StudyMaterialSection';
import ChapterList from './_components/ChapterList';
import StudyMaterialSection from './_components/StudyMaterialSection';

const Course = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState();

    useEffect(()=>{
        GetCourse()
},[])
    const GetCourse = async() => {     
        const result = await axios.get('/api/courses?courseId='+courseId);        
        console.log(result);
        setCourse(result.data.result)       
    }
  return (
    <div>

        <div className=''>
            {/* Course Intro */}
            <CourseIntroCard course = {course}/>
            {/* Study Material Options */}
            <StudyMaterialSection courseId={courseId} course={course}/>
            {/* Chapter List */}
            <ChapterList course={course}/>
        </div>
    </div>
  )
}

export default Course