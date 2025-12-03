import { Star, Sparkles, Award } from 'lucide-react';

export default function FloatingBadges() {
  return (
    <div className="pointer-events-none absolute -right-6 -top-12 z-20">
      <div className="relative w-36 h-36">
        <div className="absolute -left-4 -top-8 w-12 h-12 rounded-full bg-green-900/20 border border-green-900/40 flex items-center justify-center float-anim">
          <Star className="w-5 h-5 text-green-300" />
        </div>
        <div className="absolute right-0 top-8 w-16 h-16 rounded-full bg-green-900/20 border border-green-900/40 flex items-center justify-center float-anim delay-200">
          <Sparkles className="w-6 h-6 text-green-300" />
        </div>
        <div className="absolute left-6 bottom-0 w-10 h-10 rounded-full bg-green-900/20 border border-green-900/40 flex items-center justify-center float-anim delay-400">
          <Award className="w-4 h-4 text-green-300" />
        </div>
      </div>
    </div>
  );
}
