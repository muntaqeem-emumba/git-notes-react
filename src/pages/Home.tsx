import { Box, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import { useEffect, useState } from "react";
import GistGrid from "../components/GistGrid";
import GistList from "../components/GistList";
import api from "../services/api";
import { useSearch } from "../contexts/SearchContext";
import type Gist from "../interfaces/gist";
import CustomPagination from "../components/Pagination";
  
export default function Home() {
	const [isList, setIsList] = useState<boolean | null>(true);
	const [gists, setGists] = useState<Gist[]>([]);
	const [filteredList, setFilteredList] = useState<Gist[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const { searchTerm } = useSearch();
  const [page, setPage] = useState(1);
	const rowsPerPage = 9;

	useEffect(() => {
		const fetchGists = async () => {
			try {
				const response = await api.get<Gist[]>(`/gists/public?per_page=${rowsPerPage}&page=${page}`);
				console.log(response.data);
				setGists(response.data);
				setFilteredList(response.data);
			} catch (error) {
				console.error('Error fetching gists:', error);
				setError('Failed to load gists.');
			} finally {
				setLoading(false);
			}
		};

		fetchGists();
	}, [page]);
	
	useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredList(gists);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
			if(!lowerSearch) setFilteredList(gists);
			console.log('searching for', lowerSearch);
			console.log('gists before search', gists);
			// Filter gists based on owner login or file names
      const filtered = gists.filter(
        (gist) =>
          gist.owner.login.toLowerCase().includes(lowerSearch) ||
					gist.files && Object.keys(gist.files).some((key) => key.toLowerCase().includes(lowerSearch))
      );
			console.log('filtered gists after search', filtered);
      setFilteredList(filtered);
    }
  }, [searchTerm]);
	

	if (loading) return <p>Loading gists...</p>;
	if (error) return <p>{error}</p>;
	return (
		<>
			<Container maxWidth="xl" sx={{ mt: 2 }}>
				<Box display="flex" alignItems="center" justifyContent="space-between" gap={1}>
					<Typography variant="h4">Public Gists</Typography>
					<ToggleButtonGroup
						value={isList}
						exclusive
						onChange={() => {setIsList(!isList)}}
						aria-label="text alignment"
					>
						<ToggleButton value={true} aria-label="left aligned">
							<FormatListBulletedIcon />
						</ToggleButton>
						<ToggleButton value={false} aria-label="centered">
							<ViewCompactIcon />
						</ToggleButton>
					</ToggleButtonGroup>
				</Box>
			{isList && <GistList gists={filteredList} />}
			{!isList && <GistGrid gists={filteredList}/>}

			<Box display="flex" alignItems="center" justifyContent="flex-end" p={2}>
				<CustomPagination page={page} totalPages={10} onPageChange={(setPage)} />
			</Box>
		</Container>
		</>
	);
}