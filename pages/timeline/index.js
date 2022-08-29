import Link from 'next/link';
import AppLayout from '../../components/AppLayout';

export default function Timeline({ userName }) {
  return (
    <>
      <AppLayout>
        <h2>This is the timeline of {userName}</h2>
        <Link href="/">
          <a>Go Home</a>
        </Link>
      </AppLayout>
      <style jsx>{`
        h2 {
          font-size: 36px;
          color: tomato;
        }
      `}</style>
    </>
  );
}

//Deprecado
//Funciona para los componentes de Pagina (pages)
//Se ejecuta en el servidor
// Nos ofrece una forma que en el sevidor podamos añadirle las props que usará el componente
Timeline.getInitialProps = () => {
  // return { userName: '@gabocehu' };
  // consumiendo el endpoint que esta en api, llamado hello
  return fetch('http://localhost:3000/api/hello')
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      const { userName } = response;
      return { userName };
    })
    .catch((error) => {
      console.log(error);
    });
};
