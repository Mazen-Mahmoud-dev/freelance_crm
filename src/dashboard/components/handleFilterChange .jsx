const [filteredClients, setFilteredClients] = useState(clients);

const handleFilterChange = (filters) => {
  const result = clients.filter((client) => {
    // Example for last contacted
    if (filters.lastContacted) {
      const daysAgo = new Date();
      daysAgo.setDate(daysAgo.getDate() - parseInt(filters.lastContacted));
      if (new Date(client.lastContacted) < daysAgo) return false;
    }

    // Open tasks
    if (filters.openTasks && !client.openTasks) return false;

    // Active status
    if (filters.activeStatus && !client.isActive) return false;

    // Location
    if (filters.location && !client.location.toLowerCase().includes(filters.location.toLowerCase()))
      return false;

    // Created date
    if (filters.createdDateFrom && new Date(client.createdAt) < new Date(filters.createdDateFrom))
      return false;
    if (filters.createdDateTo && new Date(client.createdAt) > new Date(filters.createdDateTo))
      return false;

    // Financials
    if (filters.totalDealValue) {
      const val = parseFloat(filters.totalDealValue);
      if (filters.totalDealComparator === ">" && client.totalDeal <= val) return false;
      if (filters.totalDealComparator === "<" && client.totalDeal >= val) return false;
      if (filters.totalDealComparator === "=" && client.totalDeal !== val) return false;
    }

    if (filters.paymentStatus) {
      if (filters.paymentStatus === "paid" && !client.isPaid) return false;
      if (filters.paymentStatus === "unpaid" && client.isPaid) return false;
    }

    // Client status
    if (filters.clientStatus.length && !filters.clientStatus.includes(client.status))
      return false;

    return true;
  });

  setFilteredClients(result);
};
