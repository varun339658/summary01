const coursesData = [
    { id: 1, title: "Introduction to Web Development", description: "Learn the basics of HTML, CSS, and JavaScript." },
    { id: 2, title: "JavaScript for Beginners", description: "Master the fundamentals of JavaScript programming." },
    { id: 3, title: "Data Science Essentials", description: "Learn the basics of data analysis and visualization." }
];

const usersData = [
    { id: 1, name: "John Doe", points: 250, completedCourses: [], badges: [] },
    { id: 2, name: "Jane Smith", points: 420, completedCourses: [], badges: [] }
];

const badgesData = [
    { id: 1, title: "First Steps", description: "Complete your first course", icon: "🏅" },
    { id: 2, title: "Fast Learner", description: "Complete a course in under 24 hours", icon: "⚡" },
    { id: 3, title: "Knowledge Seeker", description: "Complete 3 courses", icon: "📚" }
];

let currentUser  = usersData[0]; // Automatically set the first user as the current user

const Course = ({ course, onEnroll }) => {
    return (
        <div className="course">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <button onClick={() => onEnroll(course.id)}>Enroll</button>
        </div>
    );
};

const Leaderboard = ({ users }) => {
    return (
        <div className="leaderboard">
            <h2>Leaderboard</h2>
            {users.map(user => (
                <div key={user.id} className="leaderboard-item">
                    <span>{user.name}</span>
                    <span>{user.points} Points</span>
                </div>
            ))}
        </div>
    );
};

const Badges = ({ badges }) => {
    return (
        <div className="badge-list">
            {badges.map(badge => (
                <div key={badge.id} className="badge">
                    <span>{badge.icon}</span>
                    <h4>{badge.title}</h4>
                    <p>{badge.description}</p>
                </div>
            ))}
        </div>
    );
};

const Dashboard = ({ onEnroll }) => {
    return (
        <div className="container">
            <h1>Welcome to LearnQuest!</h1>
            <h2>Available Courses</h2>
            {coursesData.map(course => (
                <Course key={course.id} course={course} onEnroll={onEnroll} />
            ))}
            <Leaderboard users={usersData} />
        </div>
    );
};

const App = () => {
    const handleEnroll = (courseId) => {
        if (currentUser ) {
            const course = coursesData.find(c => c.id === courseId);
            if (course && !currentUser .completedCourses.includes(courseId)) {
                currentUser .completedCourses.push(courseId);
                currentUser .points += 50; // Award points for enrolling
                alert(`Enrolled in ${course.title}!`);
                checkForBadges(currentUser );
            }
        }
    };

    const checkForBadges = (user) => {
        if (user.completedCourses.length === 1 && !user.badges.includes(badgesData[0])) {
            user.badges.push(badgesData[0]);
            alert("You've earned the 'First Steps' badge!");
        }
        if (user.completedCourses.length >= 3 && !user.badges.includes(badgesData[2])) {
            user.badges.push(badgesData[2]);
            alert("You've earned the 'Knowledge Seeker' badge!");
        }
    };

    return (
        <div>
            <Dashboard onEnroll={handleEnroll} />
            <div className="container user-info">
                <h2>{currentUser .name}'s Badges</h2>
                <Badges badges={currentUser .badges} />
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));