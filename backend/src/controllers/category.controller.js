const pool = require("../../connectDB")
exports.index = async (req, res, next) => {
    try {
        const categories = await pool.query(`SELECT * FROM category ORDER BY "categoryID" ASC`)
        res.status(200).json({
            error: false,
            data: categories
        })
    } catch (error) {
        return next(error);
    }
}

exports.create = async (req, res, next) => {
    const { authorID, categoryID, name, page, publicationYear, publisherID } = req.body;
    try {
      await pool.query("BEGIN"); // Start a transaction
  
      const checkBook = await pool.query('SELECT * FROM book');
      const bookID = checkBook.rows.length + 1;
  
      const result = await pool.query('INSERT INTO public.book ("bookID", "name", "page", "publisherID", "publicationYear") VALUES ($1, $2, $3, $4, $5) RETURNING *', [
        parseInt(bookID, 10),
        name,
        parseInt(page, 10),
        parseInt(publisherID, 10),
        parseInt(publicationYear, 10),
      ]);
  
      // Insert book_author relation
      await pool.query('INSERT INTO public.book_author ("bookID", "authorID") VALUES ($1, $2)', [bookID, authorID]);
  
      // Insert book_category relation
      await pool.query('INSERT INTO public.book_category ("bookID", "categoryID") VALUES ($1, $2)', [bookID, categoryID]);
  
      await pool.query("COMMIT"); // Commit the transaction
  
      res.status(201).json({
        error: false,
        message: `Book Added Successfully`,
      });
    } catch (error) {
      await pool.query("ROLLBACK"); // Rollback the transaction in case of an error
      return next(error);
    }
  };
  
  exports.delete = async (req, res, next) => {
    const id = req.params.id
    try {
        await pool.query(`DELETE FROM book WHERE "bookID" = $1;`, [id]);
        res.status(200).json({
            error: false,
            message: `Book Deleted Successfully`
        })
    } catch (error) {
        return next(error);
    }
  };
  
  exports.update = async (req, res, next) => {
    const id = req.params.id;
    const { authorID, categoryID, name, page, publicationYear, publisherID } = req.body;
    try {
      await pool.query("BEGIN"); // Start a transaction
  
      await pool.query('UPDATE public.book SET "name" = $1, "page" = $2, "publisherID" = $3, "publicationYear" = $4 WHERE "bookID" = $5', [
        name,
        parseInt(page, 10),
        parseInt(publisherID, 10),
        parseInt(publicationYear, 10),
        parseInt(id, 10),
      ]);
  
      // Update book_author relation
      await pool.query('UPDATE public.book_author SET "authorID" = $1 WHERE "bookID" = $2', [authorID, id]);
  
      // Update book_category relation
      await pool.query('UPDATE public.book_category SET "categoryID" = $1 WHERE "bookID" = $2', [categoryID, id]);
  
      await pool.query("COMMIT"); // Commit the transaction
  
      res.status(200).json({
        error: false,
        message: "Book Updated Successfully",
      });
    } catch (error) {
      await pool.query("ROLLBACK"); // Rollback the transaction in case of an error
      return next(error);
    }
  };