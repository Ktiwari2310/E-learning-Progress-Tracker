// Sample data matching React version
        const coursesData = [
            {
                id: 'react-basics',
                title: 'React Fundamentals',
                description: 'Learn the basics of React including components, props, and state management.',
                icon: '⚛️',
                color: 'icon-primary',
                lessons: [
                    { id: 'r1', title: 'Introduction to React', description: 'Understanding React basics', duration: '15 min', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
                    { id: 'r2', title: 'Components and Props', description: 'Building reusable components', duration: '20 min', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
                    { id: 'r3', title: 'State Management', description: 'Working with component state', duration: '25 min', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
                    { id: 'r4', title: 'Hooks Introduction', description: 'Using React Hooks', duration: '30 min', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' }
                ]
            },
            {
                id: 'ui-design',
                title: 'UI/UX Design Principles',
                description: 'Master the fundamentals of user interface and experience design.',
                icon: '🎨',
                color: 'icon-secondary',
                lessons: [
                    { id: 'u1', title: 'Design Basics', description: 'Core design principles', duration: '18 min', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
                    { id: 'u2', title: 'Color Theory', description: 'Understanding colors', duration: '22 min', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
                    { id: 'u3', title: 'Typography', description: 'Working with fonts', duration: '20 min', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' }
                ]
            },
            {
                id: 'javascript',
                title: 'Advanced JavaScript',
                description: 'Deep dive into advanced JavaScript concepts and patterns.',
                icon: '💻',
                color: 'icon-accent',
                lessons: [
                    { id: 'j1', title: 'Async Programming', description: 'Promises and async/await', duration: '28 min', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
                    { id: 'j2', title: 'Closures', description: 'Understanding closures', duration: '25 min', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
                    { id: 'j3', title: 'Prototypes', description: 'JavaScript prototypes', duration: '30 min', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' }
                ]
            }
        ];

        // Load from localStorage or use default data
        let completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || {};
        let currentCourse = null;
        let currentLesson = null;

        function saveToLocalStorage() {
            localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
        }

        function calculateStats() {
            const totalCourses = coursesData.length;
            const totalLessons = coursesData.reduce((acc, c) => acc + c.lessons.length, 0);
            const completedCount = Object.values(completedLessons).filter(Boolean).length;
            const completedCourses = coursesData.filter(c => 
                c.lessons.every(l => completedLessons[l.id])).length;
            const activeLessons = totalLessons - completedCount;
            const overallProgress = totalLessons > 0 ? 
                Math.round((completedCount / totalLessons) * 100) : 0;

            return {
                totalCourses,
                totalLessons,
                completedCount,
                completedCourses,
                activeLessons,
                overallProgress
            };
        }

        function renderStats() {
            const stats = calculateStats();
            const statsGrid = document.getElementById('statsGrid');
            
            statsGrid.innerHTML = `
                <div class="stat-card">
                    <div class="stat-icon icon-primary">📚</div>
                    <div class="stat-info">
                        <h3>Total Courses</h3>
                        <div class="stat-value">${stats.totalCourses}</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon icon-secondary">📈</div>
                    <div class="stat-info">
                        <h3>Overall Progress</h3>
                        <div class="stat-value">${stats.overallProgress}%</div>
                        <div class="stat-subtitle">${stats.completedCount} of ${stats.totalLessons} lessons</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon icon-accent">🏆</div>
                    <div class="stat-info">
                        <h3>Completed Courses</h3>
                        <div class="stat-value">${stats.completedCourses}</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon icon-warning">🎯</div>
                    <div class="stat-info">
                        <h3>Active Lessons</h3>
                        <div class="stat-value">${stats.activeLessons}</div>
                    </div>
                </div>
            `;
        }

        function renderCourses() {
            const coursesGrid = document.getElementById('coursesGrid');
            
            coursesGrid.innerHTML = coursesData.map(course => {
                const completed = course.lessons.filter(l => completedLessons[l.id]).length;
                const total = course.lessons.length;
                const progress = (completed / total) * 100;
                
                return `
                    <div class="course-card" onclick="showCourse('${course.id}')">
                        <div class="course-header">
                            <div class="course-icon ${course.color}">${course.icon}</div>
                        </div>
                        <h3 class="course-title">${course.title}</h3>
                        <p class="course-description">${course.description}</p>
                        <div class="progress-container">
                            <div class="progress-info">
                                <span style="color: #666;">Progress</span>
                                <span style="font-weight: 600;">${completed}/${total} lessons</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${progress}%"></div>
                            </div>
                        </div>
                        <button class="btn">View Lessons</button>
                    </div>
                `;
            }).join('');
        }

        function showCourse(courseId) {
            currentCourse = coursesData.find(c => c.id === courseId);
            if (!currentCourse) return;

            currentLesson = currentCourse.lessons[0];
            
            document.getElementById('dashboard').classList.add('hidden');
            document.getElementById('courseDetail').classList.add('active');
            
            document.getElementById('detailTitle').textContent = currentCourse.title;
            document.getElementById('detailDescription').textContent = currentCourse.description;
            
            renderLessons();
            showLesson(currentLesson.id);
        }

        function showDashboard() {
            document.getElementById('dashboard').classList.remove('hidden');
            document.getElementById('courseDetail').classList.remove('active');
            currentCourse = null;
            currentLesson = null;
            renderStats();
            renderCourses();
        }

        function renderLessons() {
            const lessonsList = document.getElementById('lessonsList');
            
            lessonsList.innerHTML = currentCourse.lessons.map(lesson => `
                <div class="lesson-item ${lesson.id === currentLesson?.id ? 'active' : ''}" 
                     onclick="showLesson('${lesson.id}')">
                    <div class="lesson-header">
                        <input type="checkbox" 
                               class="checkbox" 
                               ${completedLessons[lesson.id] ? 'checked' : ''} 
                               onclick="event.stopPropagation(); toggleLesson('${lesson.id}')">
                        <div style="flex: 1;">
                            <div class="lesson-title">${lesson.title}</div>
                            <div class="lesson-desc">${lesson.description}</div>
                            <div class="lesson-duration">⏱️ ${lesson.duration}</div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function showLesson(lessonId) {
            currentLesson = currentCourse.lessons.find(l => l.id === lessonId);
            if (!currentLesson) return;

            document.getElementById('videoFrame').src = currentLesson.videoUrl;
            document.getElementById('currentLessonTitle').textContent = currentLesson.title;
            document.getElementById('currentLessonDescription').textContent = currentLesson.description;
            
            renderLessons();
        }

        function toggleLesson(lessonId) {
            completedLessons[lessonId] = !completedLessons[lessonId];
            saveToLocalStorage();
            renderLessons();
            renderStats();
        }

        // Initial render
        renderStats();
        renderCourses();
