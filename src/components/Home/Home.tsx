import Header from '@/components/Home/Header';
import Display from '@/components/Home/Display';
import Times from '@/components/Home/Times';

export default function Home() {
  return (
    <div className="home">

      <Header />

      <Display />

      <Times />

      <a className='home__footer' href="https://www.linkedin.com/in/francisco-grynberg/" target="_blank" rel="noreferrer">Desenvolvido por <strong>Francisco Grynberg</strong></a>

    </div>
  );
}
