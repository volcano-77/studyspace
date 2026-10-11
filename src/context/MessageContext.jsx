import { useCallback, useMemo, useState } from 'react';
import { MessageContext } from './messageContextCore';

export function MessageProvider({ children }) {
  const [unreadCounts, setUnreadCounts] = useState({});

  const addUnread = useCallback((groupId) => {
    const key = Number(groupId);
    if (!Number.isInteger(key)) {
      return;
    }
    setUnreadCounts((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1
    }));
  }, []);

  const clearUnread = useCallback((groupId) => {
    const key = Number(groupId);
    if (!Number.isInteger(key)) {
      return;
    }
    setUnreadCounts((prev) => ({
      ...prev,
      [key]: 0
    }));
  }, []);

  const value = useMemo(
    () => ({
      unreadCounts,
      addUnread,
      clearUnread
    }),
    [unreadCounts, addUnread, clearUnread]
  );

  return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>;
}
