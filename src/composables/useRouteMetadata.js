export function useRouteMetadata() {
  const routeData = [
    {
      label: 'Dashboard',
      name: 'dashboard',
      to: '/',
      icon: 'dashboard',
    },
    {
      label: 'Member',
      name: 'member',
      icon: 'people',
      children: [
        {
          label: 'Member List',
          name: 'member-list',
          to: '/member/list',
          icon: 'people',
        },
      ],
    },
  ];
  return {
    routeData,
  };
}
