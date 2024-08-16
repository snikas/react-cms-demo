import { useEffect, useState, useRef } from 'react';
import getS3Content from '../utils/getS3data';


export default function useIntersectionObserver(contentApi) {

const sectionRef = useRef();
const [htmlContentCourse, setHtmlContentCourse] = useState('');

useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          try {
            const course3html = await getS3Content(contentApi);
            setHtmlContentCourse(course3html);
            observer.unobserve(sectionRef.current); // Stop observing once content is loaded
          } catch (error) {
            console.error('Error loading content:', error);
          }
        }
      },
      {
        root: null, // Observing relative to the viewport
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the section is in view
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect(); // Cleanup the observer when the component unmounts
    };
  }, [contentApi]);

  return [htmlContentCourse, sectionRef];

}