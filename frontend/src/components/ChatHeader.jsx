import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-3 pt-5 pb-4 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-15 rounded-full border border-gray-200 shadow-sm overflow-hidden bg-gray-100">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>
          {/* User info */}
          <div>
            <h3 className="font-semibold text-xl text-gray-800 text-base">{selectedUser.fullName}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span className={`w-2 h-2 rounded-full ${onlineUsers.includes(selectedUser._id) ? "bg-green-400" : "bg-gray-300"} inline-block`}></span>
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </div>
          </div>
        </div>
        {/* Close button */}
        <button onClick={() => setSelectedUser(null)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <X className="text-gray-500" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;