import Quiz from "./Quiz"
import { jsQuizz } from "./constant"

function App() {
  return (
    <div className='w-full h-screen bg-slate-950 flex justify-center items-center'>
      <Quiz  questions={jsQuizz.questions}/>
    </div>
  )
}

export default App
