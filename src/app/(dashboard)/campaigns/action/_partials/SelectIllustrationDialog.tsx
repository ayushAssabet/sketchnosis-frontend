import { IllustrationContext } from "@/contexts/IllustrationContextProvider";
import { Plus, Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { SelectIllustrationAvatarWrapper } from "./SelectIllustrationWrapper";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

    console.log(filteredIllustrations);

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
        setIllustrations(illustration);
    }, [illustration]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[60%] max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="p-6 pb-4">
                    <DialogTitle className="text-xl font-semibold text-gray-800">
                        Illustration
                    </DialogTitle>
                </DialogHeader>

                {/* Search */}
                <div className="px-3 pb-4">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Illustrations Grid */}
                <div className="flex-1 overflow-y-auto px-3">
                    <div className="grid grid-cols-3 gap-4">
                        {filteredIllustrations
                            ?.filter(
                                (illustration) =>
                                    illustration?.isPublished !== false
                            )
                            ?.map((illustration) => (
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

                <DialogFooter className="p-6 pt-4">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAdd}
                        disabled={!selectedId}
                        className="flex items-center space-x-2"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add</span>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default IllustrationDialog;
