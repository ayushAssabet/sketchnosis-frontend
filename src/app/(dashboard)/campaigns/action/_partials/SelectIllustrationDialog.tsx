import { IllustrationAvatarWrapper } from "@/app/(dashboard)/illustrations/_partials/IllustrationAvatarWrapper";
import { IllustrationContext } from "@/contexts/IllustrationContextProvider";
import { ImageIcon, Plus, Search, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { SelectIllustrationAvatarWrapper } from "./SelectIllustrationWrapper";

const IllustrationDialog = ({
    isOpen,
    onClose,
    onSelect,
    selectedIllustration,
}) => {
    const { illustration } = useContext(IllustrationContext);


    const [searchTerm, setSearchTerm] = useState("");
    const [illustrations, setIllustrations] = useState([]);
    const [selectedId, setSelectedId] = useState(
        selectedIllustration?.id || null
    );

    const filteredIllustrations = illustrations.filter((illustration) =>
        illustration.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log(filteredIllustrations)

    const handleSelect = (illustration) => {
        setSelectedId(illustration.id);
    };

    const handleAdd = () => {
        const selected = illustrations.find((ill) => ill.id === selectedId);
        if (selected) {
            onSelect(selected);
        }
        onClose();
    };

    useEffect(() => {
        setIllustrations(illustration)
    },[illustration])

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">
                        illustration
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Search */}
                <div className="p-6 border-b">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Illustrations Grid */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-5 gap-4">
                        {filteredIllustrations?.map((illustration) => (
                            <div 
                                key={illustration.id}  
                                onClick={() => handleSelect(illustration)}
                                className={`border-2 rounded-lg p-2 cursor-pointer transition-colors ${
                                    selectedId === illustration.id
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                            >
                                <SelectIllustrationAvatarWrapper
                                    image={illustration}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end space-x-3 p-6 border-t">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAdd}
                        disabled={!selectedId}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IllustrationDialog;
