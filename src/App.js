import './App.css';
import { useState, useEffect, useRef } from 'react';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

async function getS3Content(s3path) {
  const response = await fetch(s3path);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const s3dataText = await response.text();
  return DOMPurify.sanitize(s3dataText);
}

function App() {
  //TODO: set up intersection observer to load html content when parent elements come into view
  const [htmlContentCourse1, setHtmlContentCourse1] = useState('');
  const [htmlContentCourse2, setHtmlContentCourse2] = useState('');
  const [htmlContentCourse3, setHtmlContentCourse3] = useState('');

  const sectionRef = useRef();


  useEffect(() => {
    const fetchContent = async () => {
      // TODO: set up cloudfront to point to s3 origin and update fetch url
      const course1html = await getS3Content('https://learning-cms-content.s3.amazonaws.com/course1.html');
      setHtmlContentCourse1(course1html);

      const course2html = await getS3Content('https://learning-cms-content.s3.amazonaws.com/course2.html');
      setHtmlContentCourse2(course2html);
    }

    fetchContent();
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          try {
            const course3html = await getS3Content('https://learning-cms-content.s3.amazonaws.com/course3.html');
            setHtmlContentCourse3(course3html);
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
  }, []);

  return (
    <>
      <header>
        <h1>Welcome to Our Training Platform</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/">Courses</a></li>
            <li><a href="/">Contact Us</a></li>
          </ul>
        </nav>
      </header>
      <main>

        <section class="highlights">
          <h2>Featured Courses</h2>
          <div class="course-list">
            <div class="course">
              <h3>Course 1</h3>
              <div>{parse(htmlContentCourse1)}</div>
            </div>
            <div class="course">
              <h3>Course 2</h3>
              <div>{parse(htmlContentCourse2)}</div>
            </div>
          </div>
          <p class="scroll-prompt">Open network tab and scroll down to see course 3 lazy loaded..</p>
          <div style={{ marginTop: 1000, width: '100%' }} class="course" ref={sectionRef}>
            <h3>Course 3</h3>
            <div>{parse(htmlContentCourse3)}</div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
