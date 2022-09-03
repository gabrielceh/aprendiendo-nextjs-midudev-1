import { firestore } from 'myFirebase/admin';

export default (req, res) => {
  const { query } = req;
  const { id } = query;

  // conectamos a la base de datos
  firestore
    .collection('devits') // llamamos a la coleccion que queremos acceder
    .doc(id) // llamamos al doc por id
    .get() // obtenemos el documento
    .then((doc) => {
      console.log(doc.exists);
      if (!doc.exists) {
        return res.status(404).json({ error: 'field not found' }).end();
      }
      const data = doc.data(); // accedemos a la informacion
      const id = doc.id;
      const { createdAt } = data;

      res.json({
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      });
    })
    .catch(() => {
      return res.status(404).end();
    });
};
