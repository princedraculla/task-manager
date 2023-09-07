const prisma = require('../prisma/client')



const addProfile = async (req, res) => {
    const userId = req.params.id;
    const picUrl = req.file.path;
    try {
        const profile = await prisma.profile.update({
            where: {
                userId: Number(userId)
            },
            data: {
                pic: picUrl,
            },
            include: {
                User: true,
            },
        });
        res.status(200).json(profile)
    } catch (error) { 
        res.status(500).json({msg: error.message})
    }
    
}

module.exports = {
    addProfile
}