const ConscriptModel = require('../models/Conscript');

function _searchRegExp(search) {
  if (search && typeof search === 'string') {
    const searchText = search;

    const replacedTxt = searchText
      .replace(/[-[\]{}()*+?`"<>.,\\/^$|#\s]/g, '\\$&')
      .replace(/ +$/, '');

    return new RegExp(`.*${replacedTxt}.*`, 'ig');
  }

  return '';
}

function _search(query) {
  const { search, firstName, lastName, fatherName } = query;
  const searchArray = [];

  if (search) {
    const searchRegExp = _searchRegExp(search);

    searchArray.push(
      {
        firstName: {
          $regex: searchRegExp,
        },
      },
      {
        lastName: {
          $regex: searchRegExp,
        },
      },
      {
        fatherName: {
          $regex: searchRegExp,
        },
      },
      {
        fullName: {
          $regex: searchRegExp,
        },
      }
    );

    return searchArray;
  }

  if (
    (firstName && lastName && fatherName) ||
    (firstName && lastName) ||
    (lastName && fatherName) ||
    (firstName && fatherName)
  ) {
    searchArray.push({
      firstName: {
        $regex: _searchRegExp(firstName),
      },
      lastName: {
        $regex: _searchRegExp(lastName),
      },
      fatherName: {
        $regex: _searchRegExp(fatherName),
      },
    });

    return searchArray;
  }

  if (firstName) {
    searchArray.push({
      firstName: {
        $regex: _searchRegExp(firstName),
      },
    });
  }

  if (lastName) {
    searchArray.push({
      lastName: {
        $regex: _searchRegExp(lastName),
      },
    });
  }

  if (fatherName) {
    searchArray.push({
      fatherName: {
        $regex: _searchRegExp(fatherName),
      },
    });
  }

  return searchArray;
}

class Controller {
  static async createConscript(req, res) {
    const { firstName, lastName, fatherName, age, isConscript, address } = req.body;

    if (!firstName || !lastName || !fatherName || !age) {
      return res.status(400).send();
    }

    try {
      const fullName = `${firstName} ${lastName} ${fatherName}`;

      await ConscriptModel.create({
        firstName,
        lastName,
        fatherName,
        fullName,
        age,
        isConscript,
        address,
      });
    } catch (e) {
      return res.status(400).send();
    }

    return res.status(200).send();
  }

  static async getAll(req, res) {
    const match = {};
    const search = _search(req.query);

    if (search.length) {
      match.$or = search;
    }

    const result = await ConscriptModel.find(match).catch((e) => console.log(e.message));

    const transformed = result.map(
      ({ firstName, lastName, fatherName, age, createdAt, _id, isConscript, address }) => ({
        firstName,
        lastName,
        fatherName,
        age,
        createdAt,
        isConscript,
        address,
        id: _id,
      })
    );

    return res.status(200).json(transformed);
  }

  static async removeConscript(req, res) {
    try {
      const { id } = req.query;

      await ConscriptModel.findByIdAndDelete(id);

      return res.status(200).send();
    } catch (e) {
      console.log(e.message);
    }
  }
}

module.exports = Controller;
