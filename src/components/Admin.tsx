import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Download, Users, Calendar } from "lucide-react";

type WaitlistEntry = {
    id: number;
    name: string;
    email: string;
    category: string;
    categoryLabel: string;
    categorySpecific: string | null;
    linkedinId: string | null;
    createdAt: string;
};

const Admin = () => {
    const [entries, setEntries] = useState<WaitlistEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");

    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        try {
            const response = await fetch("/api/waitlist");
            const data = await response.json();
            if (data.success) {
                setEntries(data.data);
            }
        } catch (error) {
            console.error("Error fetching entries:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredEntries = entries.filter((entry) => {
        const matchesSearch =
            entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.categorySpecific?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
            filterCategory === "all" || entry.category === filterCategory;

        return matchesSearch && matchesCategory;
    });

    const exportToCSV = () => {
        const headers = ["ID", "Name", "Email", "Category", "Company/University/Event", "LinkedIn", "Date"];
        const rows = filteredEntries.map((entry) => [
            entry.id,
            entry.name,
            entry.email,
            entry.categoryLabel,
            entry.categorySpecific || "",
            entry.linkedinId || "",
            new Date(entry.createdAt).toLocaleDateString(),
        ]);

        const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `chordy-waitlist-${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
    };

    const categoryStats = {
        founder: entries.filter((e) => e.category === "founder").length,
        investor: entries.filter((e) => e.category === "investor").length,
        professional: entries.filter((e) => e.category === "professional").length,
        student: entries.filter((e) => e.category === "student").length,
        host: entries.filter((e) => e.category === "host").length,
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50/30 to-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading waitlist data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50/30 to-white p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Chordy Waitlist Admin</h1>
                    <p className="text-gray-600">Manage and view all waitlist submissions</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Total Signups</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">{entries.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-emerald-600" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">This Week</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">
                                    {
                                        entries.filter(
                                            (e) =>
                                                new Date(e.createdAt) >
                                                new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                                        ).length
                                    }
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200"
                    >
                        <div>
                            <p className="text-gray-600 text-sm font-medium mb-3">By Category</p>
                            <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Founders:</span>
                                    <span className="font-semibold">{categoryStats.founder}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Investors:</span>
                                    <span className="font-semibold">{categoryStats.investor}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Professionals:</span>
                                    <span className="font-semibold">{categoryStats.professional}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Students:</span>
                                    <span className="font-semibold">{categoryStats.student}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Hosts:</span>
                                    <span className="font-semibold">{categoryStats.host}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-gray-200">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by name, email, or company..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                            />
                        </div>
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                        >
                            <option value="all">All Categories</option>
                            <option value="founder">Founders</option>
                            <option value="investor">Investors</option>
                            <option value="professional">Professionals</option>
                            <option value="student">Students</option>
                            <option value="host">Event Hosts</option>
                        </select>
                        <button
                            onClick={exportToCSV}
                            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all duration-200 flex items-center gap-2"
                        >
                            <Download className="w-5 h-5" />
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Details
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        LinkedIn
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredEntries.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                            No entries found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredEntries.map((entry, index) => (
                                        <motion.tr
                                            key={entry.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">{entry.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-gray-600">{entry.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                                                    {entry.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-gray-600 text-sm">
                                                    {entry.categorySpecific || "-"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {entry.linkedinId ? (
                                                    <a
                                                        href={`https://${entry.linkedinId}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:text-blue-800 text-sm"
                                                    >
                                                        View Profile
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-400 text-sm">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-gray-600 text-sm">
                                                    {new Date(entry.createdAt).toLocaleDateString()}
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center text-gray-500 text-sm">
                    Showing {filteredEntries.length} of {entries.length} entries
                </div>
            </div>
        </div>
    );
};

export default Admin;
