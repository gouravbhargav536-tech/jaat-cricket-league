import { motion } from 'motion/react';
import { Target, Users, Trophy, ChevronRight } from 'lucide-react';

export function SiteIntro() {
  const pillars = [
    {
      icon: Target,
      title: "Talent Discovery",
      desc: "Identifying and nurturing grassroots cricketers from the Jaat community.",
      color: "text-cyan-400",
      bg: "bg-cyan-400/10"
    },
    {
      icon: Users,
      title: "Community Unity",
      desc: "Bringing our heritage together through the universal language of cricket.",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10"
    },
    {
      icon: Trophy,
      title: "Professional Stage",
      desc: "Providing a national-level platform with world-class standards.",
      color: "text-rose-500",
      bg: "bg-rose-500/10"
    }
  ];

  return (
    <section className="bg-[#07031e] py-16 sm:py-24 relative overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 bg-indigo-500/10 text-indigo-400 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase border border-indigo-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span>The JCL Vision 2024</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] uppercase">
              Beyond The <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">Boundaries</span> Of Just A Game
            </h2>

            <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
              Welcome to the official digital arena of the **Jaat Cricket League (JCL)**. We are more than a tournament; we are a movement dedicated to empowering youth, fostering community pride, and setting new benchmarks in community-based professional sports.
            </p>

            <div className="flex flex-wrap gap-4">
              <a 
                href="#matches-section"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-slate-950 rounded-xl font-black text-xs tracking-widest uppercase hover:bg-cyan-400 transition-all group"
              >
                <span>View Fixtures</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#about-section"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-white/5 text-white border border-white/10 rounded-xl font-black text-xs tracking-widest uppercase hover:bg-white/10 transition-all"
              >
                <span>Learn More</span>
              </a>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-6">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex items-start space-x-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all cursor-default"
              >
                <div className={`mt-1 p-3 rounded-xl ${pillar.bg} ${pillar.color} group-hover:scale-110 transition-transform`}>
                  <pillar.icon size={24} />
                </div>
                <div>
                  <h4 className="text-white font-black uppercase tracking-wider mb-2 group-hover:text-cyan-400 transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Background visual texture */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-500/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/5 blur-[100px] rounded-full pointer-events-none" />
    </section>
  );
}
