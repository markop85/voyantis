import express from 'express';
const router = express.Router();

// // In-memory queue storage
const queues = {'queue1': ['message1 from queu1', 'message2 from queu1'], queue2: ['message1 from queu2', 'message2 from queu2']};

// POST: Add message to queue
router.post('/:queue_name', (req, res) => {
    try {
        const { queue_name } = req.params;
        const message = req.body;
        if (!queues[queue_name]) {
            queues[queue_name] = [];
        }
        queues[queue_name].push(message);
        res.status(201).json({ message: 'Message added to queue' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding message to queue' });
        
    }
});

// GET: Retrieve message from queue
router.get('/:queue_name', (req, res) => {
    try {
        const { queue_name } = req.params;
        const timeout = parseInt(req.query.timeout) || 10000; // Default 10s timeout
    
        if (!queues[queue_name] || queues[queue_name].length === 0) {
            setTimeout(() => {
                    return res.sendStatus(204);
            }, timeout);
        } else {
            res.json(queues[queue_name].shift());
        
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving message from queue' });
        
    }
});

// GET: List all queues and message count
router.get('/', async (req, res) => {
   try {
     const queueList = Object.keys(queues).map(queue => ({ 
         name: queue, 
         count: queues[queue].length 
     }));
     res.json(queueList);
   } catch (error) {
       res.status(500).json({ message: 'Error retrieving queue list' });
    
   }
});

export default router;

