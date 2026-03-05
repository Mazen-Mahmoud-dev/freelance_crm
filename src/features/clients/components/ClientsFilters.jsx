import { useState } from "react";

export default function ClientsFilters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    lastContacted: "",
    openTasks: false,
    activeStatus: false,
    location: "",
    createdDateFrom: "",
    createdDateTo: "",
    lastActivityFrom: "",
    lastActivityTo: "",
    contractStart: "",
    contractEnd: "",
    totalDealValue: "",
    totalDealComparator: ">",
    paymentStatus: "",
    clientStatus: [],
  });

  const handleChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="p-4 border rounded-md bg-gray-50 dark:bg-gray-800 mb-4 flex flex-col gap-4">
      {/* Activity Filters */}
      <div className="flex gap-4 flex-wrap">
        <select
          value={filters.lastContacted}
          onChange={(e) => handleChange("lastContacted", e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Last Contacted</option>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters.openTasks}
            onChange={(e) => handleChange("openTasks", e.target.checked)}
          />
          Open Tasks
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters.activeStatus}
            onChange={(e) => handleChange("activeStatus", e.target.checked)}
          />
          Active
        </label>
      </div>

      {/* Location Filter */}
      <div className="flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Country / City / Region"
          value={filters.location}
          onChange={(e) => handleChange("location", e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* Timeline / Dates */}
      <div className="flex gap-4 flex-wrap">
        <input
          type="date"
          value={filters.createdDateFrom}
          onChange={(e) => handleChange("createdDateFrom", e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={filters.createdDateTo}
          onChange={(e) => handleChange("createdDateTo", e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={filters.lastActivityFrom}
          onChange={(e) => handleChange("lastActivityFrom", e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={filters.lastActivityTo}
          onChange={(e) => handleChange("lastActivityTo", e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* Financials */}
      <div className="flex gap-2 flex-wrap items-center">
        <select
          value={filters.totalDealComparator}
          onChange={(e) => handleChange("totalDealComparator", e.target.value)}
          className="border p-2 rounded"
        >
          <option value=">">{`>`}</option>
          <option value="<">{`<`}</option>
          <option value="=">=</option>
        </select>
        <input
          type="number"
          placeholder="Total Deal Value"
          value={filters.totalDealValue}
          onChange={(e) => handleChange("totalDealValue", e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={filters.paymentStatus}
          onChange={(e) => handleChange("paymentStatus", e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Payment Status</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </div>

      {/* Client Status */}
      <div className="flex gap-4 flex-wrap">
        {["active", "pending", "inactive"].map((status) => (
          <label key={status} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.clientStatus.includes(status)}
              onChange={(e) => {
                const newStatus = e.target.checked
                  ? [...filters.clientStatus, status]
                  : filters.clientStatus.filter((s) => s !== status);
                handleChange("clientStatus", newStatus);
              }}
            />
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </label>
        ))}
      </div>
    </div>
  );
}
