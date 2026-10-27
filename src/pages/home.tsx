import Seo from '../components/Seo';
import ZAxisStage from '@/components/welcome/ZAxisStage';

export default function Home() {
  return (
    <>
      <Seo 
        title="Live Achieve Believe — Welcome Home" 
        description="An invitation to experience a place where compassion becomes action, hope becomes visible, and every story matters." 
      />

      {/* Cinematic 3D Z-Axis Stage */}
      <ZAxisStage />
    </>
  );
}
