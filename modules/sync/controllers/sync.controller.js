const syncService = require('../services/sync.service');

const syncFromLocal = async (req, res) => {
    try {
        const sync = req.body;
        const syncs = await syncService.syncFromLocal(sync);

        res.status(200).json(syncs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const syncToLocal = async (req, res) => {
    try {
        const syncs = await syncService.syncToLocal();
        res.status(200).json(syncs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    syncFromLocal,
    syncToLocal,
};