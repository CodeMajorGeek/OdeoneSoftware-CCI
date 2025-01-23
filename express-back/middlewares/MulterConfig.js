const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Créer le dossier uploads/summaries s'il n'existe pas
const uploadDir = 'uploads/summaries'
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname)
        const filename = uniqueSuffix + ext
        // Stocker le chemin complet dans req.file
        req.filePath = path.join(uploadDir, filename)
        cb(null, filename)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['video/mp4', 'image/png']
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Format de fichier non supporté. Utilisez .mp4 ou .png'), false)
    }
}

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024 // 100MB max
    }
})

module.exports = upload
