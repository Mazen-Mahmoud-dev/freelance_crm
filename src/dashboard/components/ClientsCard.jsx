import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ClientsCard() {
  const clients = Array.from({ length: 42 }).map((_, i) => ({
    name: `Client ${i + 1}`,
    email: `client${i + 1}@mail.com`,
    projects: Math.floor(Math.random() * 8) + 1,
    status: i % 2 === 0 ? "Active" : "Pending",
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage, setClientsPerPage] = useState(8);

  const totalPages = Math.ceil(clients.length / clientsPerPage);
  const startIndex = (currentPage - 1) * clientsPerPage;
  const currentClients = clients.slice(startIndex, startIndex + clientsPerPage);

  // pagination window logic (10 max)
  const maxVisiblePages = 10;
  const startPage = Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleClientsPerPageChange = (e) => {
    setClientsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header with Clients per page */}
      <div className="flex justify-between items-center border bg-card/60 rounded-xl px-4 py-3">
        <h3 className="text-base font-semibold text-text">Clients</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Clients per page:</span>
          <div className="relative">
            <select
              value={clientsPerPage}
              onChange={handleClientsPerPageChange}
              className="appearance-none bg-background border border-border text-text text-sm px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer transition"
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
            <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
              ▼
            </span>
          </div>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid gap-4">
        {currentClients.map((client, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-xl p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-text">{client.name}</h3>
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  client.status === "Active"
                    ? "bg-green-500/10 text-green-600"
                    : "bg-yellow-500/10 text-yellow-600"
                }`}
              >
                {client.status}
              </span>
            </div>
            <p className="text-muted text-sm">{client.email}</p>
            <p className="text-muted text-sm">
              Projects:{" "}
              <span className="text-text font-medium">{client.projects}</span>
            </p>
            <button className="text-primary text-sm mt-2 self-end py-2 px-4 bg-primary/10 rounded-md hover:bg-primary/20 transition-colors">
              View
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center px-2 sm:px-4 py-2 border-t border-border bg-card/60 rounded-lg flex-wrap gap-3">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-text">{startIndex + 1}</span>–
          <span className="font-medium text-text">
            {Math.min(startIndex + clientsPerPage, clients.length)}
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
