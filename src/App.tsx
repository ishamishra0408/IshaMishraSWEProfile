import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Github, Linkedin, Mail, User } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

function App() {
  const [visitorData, setVisitorData] = useState<{ date: string; count: number }[]>([]);

  useEffect(() => {
    // Record visit
    const recordVisit = async () => {
      const today = new Date().toISOString().split('T')[0];
      await supabase
        .from('visits')
        .upsert({ date: today, count: 1 }, { onConflict: 'date' });
    };

    // Fetch visitor data
    const fetchVisitorData = async () => {
      const { data } = await supabase
        .from('visits')
        .select('*')
        .order('date', { ascending: true });
      
      if (data) {
        setVisitorData(data);
      }
    };

    recordVisit();
    fetchVisitorData();
  }, []);

  const chartData = {
    labels: visitorData.map(d => d.date),
    datasets: [
      {
        label: 'Daily Visitors',
        data: visitorData.map(d => d.count),
        borderColor: '#FFD700',
        backgroundColor: 'rgba(255, 215, 0, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#FFD700',
        },
      },
    },
    scales: {
      y: {
        ticks: { color: '#FFD700' },
        grid: { color: 'rgba(255, 215, 0, 0.1)' },
      },
      x: {
        ticks: { color: '#FFD700' },
        grid: { color: 'rgba(255, 215, 0, 0.1)' },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <header className="space-y-4">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                Isha Mishra
              </h1>
              <p className="text-xl text-gray-300">
                Software Development Engineer
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com/ishamishra0408" className="text-yellow-400 hover:text-yellow-300">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com/in/ishamishracalifornia" className="text-yellow-400 hover:text-yellow-300">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="mailto:ishamishra0408@gmail.com" className="text-yellow-400 hover:text-yellow-300">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </header>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-yellow-400">About Me</h2>
              <p className="text-gray-300">
                Software Development Engineer with expertise in full-stack development, cloud computing, and data structures & algorithms. 
                Experienced in developing scalable applications using modern technologies and best practices.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-yellow-400">Experience</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Software Development Engineer</h3>
                  <p className="text-gray-400">Cisco Systems • 2022 - Present</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Developed and maintained microservices using Java Spring Boot and Node.js</li>
                    <li>Implemented CI/CD pipelines using Jenkins and Docker</li>
                    <li>Optimized database queries and improved application performance</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Software Engineer</h3>
                  <p className="text-gray-400">Accenture • 2020 - 2022</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Led development of RESTful APIs using Node.js and Express</li>
                    <li>Implemented authentication and authorization using JWT</li>
                    <li>Collaborated with cross-functional teams to deliver high-quality solutions</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-yellow-400">Skills</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-blue-900/30 p-3 rounded-lg backdrop-blur-sm">
                  <h3 className="font-semibold text-yellow-400">Languages</h3>
                  <p className="text-gray-300">JavaScript, TypeScript, Java, Python</p>
                </div>
                <div className="bg-blue-900/30 p-3 rounded-lg backdrop-blur-sm">
                  <h3 className="font-semibold text-yellow-400">Frontend</h3>
                  <p className="text-gray-300">React, Vue.js, HTML5, CSS3</p>
                </div>
                <div className="bg-blue-900/30 p-3 rounded-lg backdrop-blur-sm">
                  <h3 className="font-semibold text-yellow-400">Backend</h3>
                  <p className="text-gray-300">Node.js, Spring Boot, Express</p>
                </div>
                <div className="bg-blue-900/30 p-3 rounded-lg backdrop-blur-sm">
                  <h3 className="font-semibold text-yellow-400">Databases</h3>
                  <p className="text-gray-300">MongoDB, PostgreSQL, MySQL</p>
                </div>
                <div className="bg-blue-900/30 p-3 rounded-lg backdrop-blur-sm">
                  <h3 className="font-semibold text-yellow-400">Cloud</h3>
                  <p className="text-gray-300">AWS, Docker, Kubernetes</p>
                </div>
                <div className="bg-blue-900/30 p-3 rounded-lg backdrop-blur-sm">
                  <h3 className="font-semibold text-yellow-400">Tools</h3>
                  <p className="text-gray-300">Git, Jenkins, JIRA</p>
                </div>
              </div>
            </section>
          </div>

          {/* Visitor Analytics */}
          <div className="lg:col-span-1 bg-blue-900/50 p-6 rounded-lg backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Visitor Analytics</h2>
            <div className="h-[400px]">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;