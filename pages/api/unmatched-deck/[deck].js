import fetch from "axios";
import Cors from "cors";

const cors = Cors();

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export const getDeck = async (deckid) => {
  const url = `https://unmatched.cards/api/decks/${deckid}`;

  try {
    const result = await fetch(url);
    return result.data;
  } catch {
    return ucardMock;
  }
};

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  const { deck } = req.query;

  const url = `https://unmatched.cards/api/decks/${deck}`;

  try {
    const result = await fetch(url);
    // return result.data;
    res.status(200).json(result.data);
  } catch (err) {
    return res.status(500).json(JSON.stringify(err));
  }

  //   console.log({ deck });
  //   await runMiddleware(req, res, cors);
  //   const date = new Date();
  //   res.status(200).json({ name: "John Doe" + JSON.stringify(date) });
}
