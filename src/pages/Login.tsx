import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Login() {
  const [name, setName] = useState('')
  const [disability, setDisability] = useState('Other')
  const [language, setLanguage] = useState('English')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const user = { name, disability, language }
    try {
      localStorage.setItem('sitare_user', JSON.stringify(user))
    } catch (err) {
      // ignore storage errors
    }
    // simple redirect to main dashboard (home for now)
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-warm">
      <div className="w-full max-w-md">
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="text-center">Tell us about you</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Type of Disability</label>
                <select value={disability} onChange={(e) => setDisability(e.target.value)} className="w-full p-3 rounded-lg border">
                  <option>Visual</option>
                  <option>Hearing</option>
                  <option>Mobility</option>
                  <option>Cognitive</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Preferred Language</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full p-3 rounded-lg border">
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Telugu</option>
                  <option>Spanish</option>
                </select>
              </div>

              <div>
                <Button type="submit" className="w-full btn-hero">Submit</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
