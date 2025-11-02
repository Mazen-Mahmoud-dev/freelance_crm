import RecentActivityItem from "./RecentActivityItem";

export default function RecentActivityList({ activities }) {
  return (
    <div className="space-y-3">
      {activities.map((act) => (
        <RecentActivityItem
          key={act.id}
          user={act.user}
          action={act.action}
          time={act.time}
        />
      ))}
    </div>
  );
}
