import Header from '@/components/Header/Header';
import Display from '@/components/Confronto/Home/Display';
import Times from '@/components/Confronto/Home/Times';

export default function ConfrontoHome() {
  return (
    <div className="confrontohome" data-testid="confronto-home">

      <Header />

      <Display />

      <Times />

    </div>
  );
}
