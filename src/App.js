import './App.css';
import { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

async function getS3Content (s3path) {
  const s3data = await fetch(s3path);
  const s3dataText = await s3data.text();
  return DOMPurify.sanitize(s3dataText);
}

function App() {
  //TODO: set up intersection observer to load html content when parent elements come into view
  const [htmlContentCourse1, setHtmlContentCourse1] = useState('');
  const [htmlContentCourse2, setHtmlContentCourse2] = useState('');


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
        </section>
      </main>
    </>
  );
}

export default App;
