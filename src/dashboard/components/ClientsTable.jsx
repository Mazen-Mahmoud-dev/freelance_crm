import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ClientsTable() {
  const clients = Array.from({ length: 100 }).map((_, i) => ({
    id: i + 1,
    name: `Client ${i + 1}`,
    email: `client${i + 1}@mail.com`,
    projects: i + 2,
    status: i % 2 === 0 ? "Active" : "Pending",
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const totalPages = Math.ceil(clients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentClients = clients.slice(startIndex, startIndex + itemsPerPage);

  // Pagination window logic (show 10 pages max)
  const maxVisiblePages = 10;
  const startPage = Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="bg-card border border-primary rounded-xl shadow-sm max-w-full">
      {/* Header Controls */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-border bg-card/60 flex-wrap gap-3">
        <h3 className="text-lg font-semibold text-text">Clients</h3>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="text-muted">Clients per page:</span>
          <div className="relative">
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="appearance-none bg-background border border-primary text-text text-sm px-4 py-1 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer transition"
            >
              {[5, 8, 10, 15, 20, 25].map((num) => (
                <option
                  key={num}
                  value={num}
                  className="bg-card text-text"
                >
                  {num}
                </option>
              ))}
            </select>
            <span className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
              ▼
            </span>
          </div>
        </div>
      </div>

      {/* Scrollable Table */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-[900px] w-full text-left border-collapse">
          <thead className="bg-primary/30 text-sm uppercase text-muted-foreground">
            <tr>
              <th className="py-3 px-6">Client Name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Projects</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border bg-primary/15">
            {currentClients.map((client) => (
              <tr key={client.id} className="hover:bg-primary/5 transition">
                <td className="py-4 px-6 font-medium text-text">{client.name}</td>
                <td className="py-4 px-6 text-muted">{client.email}</td>
                <td className="py-4 px-6 text-muted">{client.projects}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      client.status === "Active"
                        ? "bg-green-500/10 text-green-600"
                        : "bg-yellow-500/10 text-yellow-600"
                    }`}
                  >
                    {client.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="text-primary text-sm bg-primary/20 hover:bg-primary/30 py-2 rounded-md px-4">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center px-6 py-4 border-t border-border bg-card/60 flex-wrap gap-3">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-text">{startIndex + 1}</span>–
          <span className="font-medium text-text">
            {Math.min(startIndex + itemsPerPage, clients.length)}
          </span>{" "}
          of <span className="font-medium text-text">{clients.length}</span> clients
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1 text-sm text-muted hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft size={16} /> Prev
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: endPage - startPage + 1 }).map((_, i) => {
              const pageNum = startPage + i;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1.5 rounded-md text-sm transition ${
                    currentPage === pageNum
                      ? "bg-primary text-white"
                      : "text-muted hover:bg-primary/10"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 text-sm text-muted hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
