import parse from 'html-react-parser';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

function LazyModule ({ contentApi, heading }) {
    const [content, sectionRef] = useIntersectionObserver(contentApi)

    return (
        <div className="course" ref={sectionRef}>
            <h3>{ heading }</h3>
            <div>{parse(content)}</div>
        </div>
    )
}

export default LazyModule;