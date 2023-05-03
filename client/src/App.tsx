import { useState, useEffect } from 'react'
import './App.css'
import { strongholdsAPI } from './services/strongholds'

function App() {
    const [strongholds, setStrongholds] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        async function loadStrongholds() {
            setLoading(true)
            try {
                const data = await strongholdsAPI.get()
                setStrongholds(data)
            } catch (e) {
                console.error(e)
                setLoading(false)
            } finally {
                setLoading(false)
            }
        }
        loadStrongholds()
    }, [])

    const getStrongholdsContent = (strongholds: any) => {
        let content = []
        for (let idx in strongholds) {
            const item = strongholds[idx]
            content.push(<li key={item.id}>{item.name}</li>)
        }

        return content
    }

    return (
        <div>
            {loading && (
                <div className="center-page">
                    <span className="spinner primary"></span>
                    <p>Loading...</p>
                </div>
            )}
            <ul>
                {getStrongholdsContent(strongholds)}
            </ul>
            <blockquote cite="Benjamin Franklin">
                Tell me and I forget, teach me and I may remember, involve me and I learn.
            </blockquote>
        </div>
    )
}

export default App