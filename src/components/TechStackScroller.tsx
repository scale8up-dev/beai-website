import pythonLogo from 'figma:asset/aa46bf4da0d08af822ab6a89d42e025dc1d4aacd.png';
import jiraLogo from 'figma:asset/39fc9d2b4a95050555ab3a33662fec27365688a4.png';
import djangoLogo from 'figma:asset/de8a248c27e665e238db5475a55dcef0a26780da.png';
import reactLogo from 'figma:asset/45e763b7c7b6436139b812011df6289f278277ce.png';
import nodeLogo from 'figma:asset/198f93b4a268a25750510f0f4e1b1cd6acebf5a4.png';
import mongoLogo from 'figma:asset/f99456d8f2d5bfee5b9cec397842e2bad61e5612.png';
import javaLogo from 'figma:asset/7f1f58573d18e31c7d44848ca448753e315c1ce4.png';
import mysqlLogo from 'figma:asset/7b4330aef2d44cab67e244829da43d6633258c47.png';
import figmaLogo from 'figma:asset/f5a6152b5bd0bf19dd4fac9fae9ef191b6fea64f.png';
import awsLogo from 'figma:asset/61b366954c970e111601b073629ed4fa7d084570.png';
import tensorflowLogo from 'figma:asset/695952df960f495499c3981c273e7515162b3e4b.png';
import flaskLogo from 'figma:asset/abc9177186091f20f8cdec48166134b608b0b8e0.png';
import postgresLogo from 'figma:asset/7bf2829c4870bafbc6947d7f6167458e0e30b698.png';
import dockerLogo from 'figma:asset/3a8af5eb0facea5f477069c719e5681c3e5b5b49.png';
import kotlinLogo from 'figma:asset/d4bb14532dc1a24eaeadd4d715a5938e3e2cb897.png';
import pytorchLogo from 'figma:asset/32e989ffa30793bf6739fce3033d4957520d3434.png';
import azureLogo from 'figma:asset/45d76dce582094e3b39b4e406e1f06897473ecbc.png';
import gitLogo from 'figma:asset/f7af77afea7ba73958bb386a28dc57d080c9d44b.png';
import jsLogo from 'figma:asset/0e937fa06b1bd10bd3d4828e8e1847252a9d5bf5.png';
import cssLogo from 'figma:asset/dc152c406eb0d581c178a2b7bd87835eeaac8a94.png';
import htmlLogo from 'figma:asset/72849654842112051dae56dc6ee61e8713baa23f.png';
import redisLogo from 'figma:asset/063aa41b1b17f3a21518d1e65909d174f00d104c.png';
import tsLogo from 'figma:asset/d1159c58c881e3cdb80b1e79136591ff14c48f39.png';
import graphqlLogo from 'figma:asset/49b7caec8f5ead98125bfbd45cd8dd36f273f0de.png';
import angularLogo from 'figma:asset/6f054884229317ee0450a2d32c55006255c012f0.png';
import vueLogo from 'figma:asset/f94d15c155b49f2027ebe5ec5d9338feb59558e9.png';
import springLogo from 'figma:asset/723dd1cdba383bfb14233efe044f84bb1697182d.png';
import kubernetesLogo from 'figma:asset/695bc9fa6ca2906b712ed4532a2581bd4f981dad.png';

export function TechStackScroller() {
  const technologies = [
    // Row 1
    { name: 'React', color: '#61DAFB', icon: '⚛️', image: reactLogo },
    { name: 'Python', color: '#3776AB', icon: '🐍', image: pythonLogo },
    { name: 'Java', color: '#007396', icon: '☕', image: javaLogo },
    { name: 'Kotlin', color: '#7F52FF', icon: 'K', image: kotlinLogo },
    { name: 'JavaScript', color: '#F7DF1E', icon: 'JS', image: jsLogo },
    { name: 'TypeScript', color: '#3178C6', icon: 'TS', image: tsLogo },
    { name: 'HTML5', color: '#E34F26', icon: 'HTML', image: htmlLogo },
    { name: 'CSS3', color: '#1572B6', icon: 'CSS', image: cssLogo },
    { name: 'Node.js', color: '#339933', icon: '⬢', image: nodeLogo },
    { name: 'Angular', color: '#DD0031', icon: 'A', image: angularLogo },
    { name: 'Vue.js', color: '#4FC08D', icon: 'V', image: vueLogo },
    { name: 'Django', color: '#092E20', icon: 'D', image: djangoLogo },
    { name: 'Flask', color: '#000000', icon: 'F', image: flaskLogo },
    { name: 'Spring', color: '#6DB33F', icon: 'S', image: springLogo },
    { name: 'Docker', color: '#2496ED', icon: '🐳', image: dockerLogo },
    { name: 'Kubernetes', color: '#326CE5', icon: 'K8s', image: kubernetesLogo },
    { name: 'AWS', color: '#FF9900', icon: 'AWS', image: awsLogo },
    { name: 'Azure', color: '#0078D4', icon: 'Az', image: azureLogo },
    { name: 'Git', color: '#F05032', icon: 'Git', image: gitLogo },
    { name: 'Jira', color: '#0052CC', icon: 'J', image: jiraLogo },
    { name: 'Figma', color: '#F24E1E', icon: 'F', image: figmaLogo },
    { name: 'MongoDB', color: '#47A248', icon: 'M', image: mongoLogo },
    { name: 'PostgreSQL', color: '#4169E1', icon: 'P', image: postgresLogo },
    { name: 'MySQL', color: '#4479A1', icon: 'SQL', image: mysqlLogo },
    { name: 'Redis', color: '#DC382D', icon: 'R', image: redisLogo },
    { name: 'GraphQL', color: '#E10098', icon: 'GQL', image: graphqlLogo },
    { name: 'TensorFlow', color: '#FF6F00', icon: 'TF', image: tensorflowLogo },
    { name: 'PyTorch', color: '#EE4C2C', icon: 'PT', image: pytorchLogo },
  ];

  // Duplicate the array for seamless infinite scroll
  const duplicatedTechs = [...technologies, ...technologies];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50/60 via-purple-50/50 to-pink-50/60 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-gradient-to-br from-sky-200 to-cyan-200 rounded-full opacity-15 blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-gradient-to-br from-cyan-200 to-sky-200 rounded-full opacity-15 blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 lg:px-8 mb-8 relative z-10">
        <h2 className="text-3xl text-center mb-2">
          <span className="text-blue-700">Techstack</span> We Provide
        </h2>
        <p className="text-center text-gray-600">
          Expertise across modern technologies and frameworks
        </p>
      </div>

      {/* Scrolling Container */}
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-sky-50/80 via-cyan-50/60 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-sky-50/80 via-cyan-50/60 to-transparent z-10"></div>

        {/* Scrolling track */}
        <div className="flex animate-scroll hover:pause-animation">
          {duplicatedTechs.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex-shrink-0 mx-4 group"
            >
              <div className="w-28 h-28 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center gap-2 border-2 border-gray-100 hover:border-purple-300 hover:-translate-y-2 group-hover:scale-110">
                {tech.image ? (
                  <img 
                    src={tech.image} 
                    alt={tech.name}
                    className="w-14 h-14 object-contain"
                  />
                ) : (
                  <div
                    className="text-3xl flex items-center justify-center w-14 h-14 rounded-xl"
                    style={{ 
                      backgroundColor: `${tech.color}20`,
                      color: tech.color 
                    }}
                  >
                    {tech.icon}
                  </div>
                )}
                <span className="text-xs text-gray-700 font-medium text-center px-2">
                  {tech.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
          width: fit-content;
        }

        .pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
