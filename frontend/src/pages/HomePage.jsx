import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="w-screen h-screen min-h-screen flex bg-gray-50 overflow-hidden pt-16"> {/* pt-16 offsets the Navbar */}
      <Sidebar />
      <main className="flex-1 flex flex-col h-full">
        {!selectedUser ? (
          <div className="flex flex-1 items-center justify-center h-full">
            <NoChatSelected />
          </div>
        ) : (
          <ChatContainer />
        )}
      </main>
    </div>
  );
};
export default HomePage;