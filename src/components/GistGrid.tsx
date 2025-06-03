// components/GistGrid.tsx
import { Grid, Box } from "@mui/material";
import GistCard from "./GistCard";
import styles from "../App.module.css";
import type Gist from "../interfaces/gist";
const GistGrid = ({ gists }: { gists: Gist[] }) => {
  console.log(gists);

  return (
    <Box>
      <Grid container spacing={2}>
        {gists.map((gist, index) => (
          <Grid size={{ xs: 12, md: 4, sm: 6 }} key={index} className={styles.gistCard}>
            <GistCard {...gist} />
          </Grid>
        ))}
      </Grid>

      {/* <Box display="flex" justifyContent="flex-end" mt={4}>
        
        <CustomPagination
          page={page}
          totalPages={Math.ceil(gists.length / rowsPerPage)}
          onPageChange={setPage}
        />
        ;
      </Box> */}
    </Box>
  );
};

export default GistGrid;
