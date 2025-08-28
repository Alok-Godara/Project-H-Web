import { useState } from "react";
import {
  Filter,
  Search,
  FileText,
  TestTube,
  Stethoscope,
  Calendar,
} from "lucide-react";
import { getMedicalEventsForPatient } from "../data/mockData";

const Timeline = ({ patient, selectedEvent, onEventSelect }) => {

  const events = patient ? getMedicalEventsForPatient(patient.id) : [];

  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const eventTypes = [
    { type: "lab", label: "Lab Results", icon: TestTube },
    { type: "visit", label: "Office Visits", icon: Stethoscope },
    { type: "document", label: "Documents", icon: FileText },
    { type: "appointment", label: "Appointments", icon: Calendar },
  ];

  const getEventIcon = (type) => {
    const eventType = eventTypes.find((et) => et.type === type);
    return eventType?.icon || FileText;
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilters.length === 0 || selectedFilters.includes(event.type);
    return matchesSearch && matchesFilter;
  });

  // Group events by month
  const groupedEvents = filteredEvents.reduce((groups, event) => {
    const date = new Date(event.date);
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
    const monthLabel = date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    if (!groups[monthKey]) {
      groups[monthKey] = { label: monthLabel, events: [] };
    }
    groups[monthKey].events.push(event);
    return groups;
  }, {});

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {patient.name}
            </h2>
            <p className="text-gray-600">
              {patient.age}y {patient.sex} • ID: {patient.id}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Filter size={18} />
                <span className="text-sm">Filter</span>
              </button>

              {filterOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-20">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Document Types
                  </h3>
                  {eventTypes.map((type) => (
                    <label
                      key={type.type}
                      className="flex items-center space-x-2 py-1"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFilters.includes(type.type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedFilters([...selectedFilters, type.type]);
                          } else {
                            setSelectedFilters(
                              selectedFilters.filter((f) => f !== type.type)
                            );
                          }
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">
                        {type.label}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search medical history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Timeline Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {Object.entries(groupedEvents)
          .sort(([a], [b]) => b.localeCompare(a))
          .map(([monthKey, group]) => (
            <div key={monthKey} className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 sticky top-0 bg-white py-2">
                {group.label}
              </h3>

              <div className="space-y-3">
                {group.events
                  .sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )
                  .map((event) => {
                    const EventIcon = getEventIcon(event.type);
                    const isSelected = selectedEvent?.id === event.id;

                    return (
                      <div
                        key={event.id}
                        onClick={() => onEventSelect(event)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? "border-blue-500 bg-blue-50 shadow-md"
                            : "border-gray-200 hover:border-blue-300 hover:shadow-sm bg-white"
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div
                            className={`p-2 rounded-lg ${
                              isSelected ? "bg-blue-100" : "bg-gray-100"
                            }`}
                          >
                            <EventIcon
                              size={18}
                              className={
                                isSelected ? "text-blue-600" : "text-gray-600"
                              }
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4
                              className={`font-medium ${
                                isSelected ? "text-blue-900" : "text-gray-900"
                              }`}
                            >
                              {event.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {event.description}
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                              <span>
                                {new Date(event.date).toLocaleDateString()}
                              </span>
                              <span>•</span>
                              <span className="capitalize">{event.type}</span>
                              {event.provider && (
                                <>
                                  <span>•</span>
                                  <span>{event.provider}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Timeline;
