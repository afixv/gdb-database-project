const pool = require("../../connectDB")
exports.index = async (req, res, next) => {
    try {
        const books = await pool.query(`SELECT * FROM "BOOK" ORDER BY "ISBN" ASC`)
        res.status(200).json({
            error: false,
            data: books
        })
    } catch (error) {
        return next(error);
    }
}

exports.create = async (req, res, next) => {
    const { ISBN, TITLE, PUBLISHER_ID, PUBLICATION_YEAR, EDITION, AUTHOR, LANGUAGE, PAGES, SYNOPSIS, CAPITAL_PRICE, SELLING_PRICE } = req.body;
    try {
        const result = await pool.query('INSERT INTO "BOOK" ("ISBN", "TITLE", "PUBLISHER_ID", "PUBLICATION_YEAR", "EDITION", "LANGUAGE", "PAGES", "SYNOPSIS", "CAPITAL_PRICE", "SELLING_PRICE", "LAST_UPDATED") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_DATE) RETURNING *', 
        [
            parseInt(ISBN, 10), 
            TITLE, 
            parseInt(PUBLISHER_ID, 10), 
            parseInt(PUBLICATION_YEAR, 10), 
            parseInt(EDITION, 10), 
            LANGUAGE, 
            parseInt(PAGES, 10), 
            SYNOPSIS, 
            parseInt(CAPITAL_PRICE, 10), 
            parseInt(SELLING_PRICE, 10)
        ]);
        res.status(201).json({
            error: false,
            message: `Berhasil menambahkan buku`,
        })
    } catch (error) {
        return next(error);
    }
}

exports.delete = async (req, res, next) => {
    const id = req.params.id
    try {

        res.status(200).json({
            error: false,
            message: `Berhasil menghapus buku dengan id ${id}`
        })
    } catch (error) {
        return next(error);
    }
}
exports.update = async (req, res, next) => {
    const id = req.params.id
    try {

        res.status(200).json({
            error: false,
            message: "Berhasil mengubah buku"
        })
    } catch (error) {
        return next(error);
    }
}