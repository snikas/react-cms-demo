import './App.css';
import LazyModule from './components/Module';

function App() {
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

        <section className="highlights">
          <h2>Featured Courses</h2>
          <div class="course-list">
            <LazyModule 
              heading="Course 1"
              contentApi="https://learning-cms-content.s3.amazonaws.com/course1.html" 
            />
            <LazyModule 
              heading="Course 2"
              contentApi="https://learning-cms-content.s3.amazonaws.com/course2.html" 
            />
          </div>
          <p className="scroll-prompt">Open network tab and scroll down to see course 3 lazy loaded..</p>
          <div style={{ marginTop: 1000, width: '100%' }}>
            <LazyModule 
              heading="Course 3"
              contentApi="https://learning-cms-content.s3.amazonaws.com/course3.html" 
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
