import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/CS1234.png" width={200} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        {/* end course 1 */}
        <div className="wd-dashboard-course">
        <Link to="/Kambaz/Courses/0002/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/CS0002.jpg" width={200} />
            <div>
              <h5> CS0002 Course 2 </h5>
              <p className="wd-dashboard-course-title">
                Software developer  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        {/* end course 2 */}
        <div className="wd-dashboard-course">
        <Link to="/Kambaz/Courses/0003/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/CS0003.jpg" width={200} />
            <div>
              <h5> CS0003 Course 3 </h5>
              <p className="wd-dashboard-course-title">
                UI Engineer  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        {/* end course 3 */}
        <div className="wd-dashboard-course">
        <Link to="/Kambaz/Courses/0004/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/CS0004.jpg" width={200} />
            <div>
              <h5> CS0004 Course 4 </h5>
              <p className="wd-dashboard-course-title">
                Mickey Mouse  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        {/* end course 4 */}
        <div className="wd-dashboard-course">
        <Link to="/Kambaz/Courses/0005/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/CS0005.jpg" width={200} />
            <div>
              <h5> CS0005 Course 5 </h5>
              <p className="wd-dashboard-course-title">
                Pluto  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        {/* end course 5 */}
        <div className="wd-dashboard-course">
        <Link to="/Kambaz/Courses/0006/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/CS0006.jpg" width={200} />
            <div>
              <h5> CS0006 Course 6 </h5>
              <p className="wd-dashboard-course-title">
                Donald Duck </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        {/* end course 6 */}
        <div className="wd-dashboard-course">
        <Link to="/Kambaz/Courses/0007/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/CS0007.png" width={200} />
            <div>
              <h5> CS0007 Course 7 </h5>
              <p className="wd-dashboard-course-title">
                Hello Kitty </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        {/* end course 7 */}
      </div> 
      {/* end courses div */}
    </div>
);}
