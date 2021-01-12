const app = require('./app')
const PORT = process.env.PORT || 5000

// app.get('*', (req, res) => {
//     res.sendFile(__dirname + '/tree-project/dist/CRM.html')
// })

app.listen(PORT, () => console.log(`server has been started on ${PORT}`))