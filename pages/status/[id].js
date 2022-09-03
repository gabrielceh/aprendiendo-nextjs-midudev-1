import Devit from 'components/Devit';
import { firestore } from 'myFirebase/admin';
import { useRouter } from 'next/router';

export default function DevitPage(props) {
  const router = useRouter();

  if (router.isFallback) return <h3>Loading...</h3>;

  return (
    <>
      <Devit
        id={props.id}
        avatar={props.avatar}
        userName={props.userName}
        content={props.content}
        userId={props.userId}
        img={props.img}
        createdAt={props.createdAt}
      />
      <style jsx>{``}</style>
    </>
  );
}

// deprecado
// solo funciona en Pages
// se ejecuta una vez en el servidor y luego en el cliente
// context contiene: res, req, query, pathname, err, asPath
// DevitPage.getInitialProps = async (context) => {
//   const { query, res } = context;
//   const { id } = query;

//   // return fetch(`http://localhost:3000/api/devits/${id}`).then((apiResp) => {
//   //   console.log(apiResp);
//   //   if (!apiResp.ok) {
//   //     res.writeHead(301, { location: '/home' }).send().end();
//   //   }
//   //   return apiResp.json();
//   // });

//   try {
//     console.log('getInitialProps');
//     const resp = await fetch(`http://localhost:3000/api/devits/${id}`);
//     if (!resp.ok) {
//       // return res.writeHead(404).end()
//       return res.writeHead(301, { location: '/home' }).end();
//     }
//     const data = await resp.json();
//     console.log(data.createdAt);
//     return data;
//   } catch (error) {
//     return { error: 'error' };
//   }
// };

// // https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props
// // Recomendable para paginas que cambiaran mucho
// export async function getServerSideProps(context) {
//   const { params, res } = context;
//   const { id } = params;
//   try {
//     const resp = await fetch(`http://localhost:3000/api/devits/${id}`);
//     if (!resp.ok) {
//       return res.writeHead(301, { location: '/home' }).end();
//     }
//     //Devuelve unas props, si o si
//     const props = await resp.json();
//     return {
//       props,
//     };
//   } catch (error) {
//     return { props: {} };
//   }
// }

// https://www.youtube.com/watch?v=i16PlS9aTJU&list=PLV8x_i1fqBw1VR86y4C72xMGJ8ifjBwJ6&index=7
// 1:29:23
export async function getStaticPaths() {
  return {
    paths: [
      /* { params: { id: 'vgESFxQAPdjiKRWc50kB' } } */
    ],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const { id } = params;

  return firestore
    .collection('devits') // llamamos a la coleccion que queremos acceder
    .doc(id) // llamamos al doc por id
    .get() // obtenemos el documento
    .then((doc) => {
      const data = doc.data(); // accedemos a la informacion
      const id = doc.id;
      const { createdAt } = data;

      const props = {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      };
      return { props };
    })
    .catch(() => {
      return { props: {} };
    });
}
