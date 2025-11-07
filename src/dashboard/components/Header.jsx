import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

const Header = ({title}) => {
  return (
    <div className="flex justify-between items-start flex-wrap gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-text">{title}s</h2>
        <p className="text-muted">
          Manage your clients and monitor active projects.
        </p>
      </div>
      <Link
        to="add"
        className="bg-primary text-white px-5 py-3 flex items-center gap-2 rounded-lg shadow hover:scale-[1.02] transition-all"
      >
        <Plus size={18} /> Add {title}
      </Link>
    </div>
  )
}

export default Header
