import { Typography } from "@material-tailwind/react";

interface TableFoldersProps {
  TABLE_HEAD: string[];
  TABLE_ROWS: any[];
}

export function TableFolders({ TABLE_HEAD, TABLE_ROWS }: TableFoldersProps) {
  return (
    <table className="w-full min-w-max table-auto text-left p-0">
      <thead>
        <tr>
          {TABLE_HEAD.map((head) => (
            <th
              key={head}
              className="  border-blue-gray-100 bg-transparent p-4"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                {head}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {TABLE_ROWS.map(({ fileName, fileId, path }, index) => {
          const isLast = index === TABLE_ROWS.length - 1;
          const classes = isLast
            ? "p-4"
            : "p-4 border-b  rounded-full border-blue-gray-50";

          return (
            <tr key={fileId} className="border">
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {fileName}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {path === "/Root" ? "/" : path}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  "
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  color="blue"
                  className="font-medium"
                >
                  Edit
                </Typography>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
