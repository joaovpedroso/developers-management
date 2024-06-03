"use client";

import { PageTitle } from "@/components/PageTitle";
import { DEFAULT_PER_PAGE } from "@/constants";
import { useDeleteLevel, useLevels } from "@/hooks";
import { ActionEnum, IFilters, IMeta, OrdenationEnum } from "@/types/Common";

import IconAccountTree from "@mui/icons-material/AccountTree";
import { Button, Grid, TextField } from "@mui/material";
import { ChangeEventHandler, useEffect, useState } from "react";
import { ICurrentModal, ModalType } from "../desenvolvedores/Developers.types";
import { SkeletonTable } from "@/components/SkeletonTable";
import { LevelsList } from "./LevelsList";
import { DeleteModal } from "@/components/DeleteModal";
import { toast } from "react-toastify";
import { LevelForm } from "@/components/Forms/LevelForm";

const LevelsPage = () => {
  const [currentModal, setCurrentModal] = useState<ICurrentModal>({
    type: ModalType.closed,
    params: null,
  });

  const [filters, setFilters] = useState<IFilters>({
    order: OrdenationEnum.asc,
    page: 1,
    perPage: DEFAULT_PER_PAGE,
    query: "",
  });

  const { data, isLoading, refetch } = useLevels(filters);
  const { isPending, delete: deleteLevel } = useDeleteLevel({
    onSuccess: () => {
      toast.success("Nível excluido com sucesso!");
      refetch();
      setCurrentModal({
        type: ModalType.closed,
        params: null,
      });
    },
    onError: () => {
      toast.error("Não foi possível excluir.");
    },
  });

  const levelsList = data?.data ?? [];
  const meta = data?.meta ?? ({} as IMeta);

  const handleSearchTerm = (
    event: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFilters((activeFilters) => ({
      ...activeFilters,
      query: event.target.value,
    }));
  };

  const handleCreateNewLevel = () => {
    setCurrentModal({
      type: ModalType.form,
      params: null,
    });
  };

  const handleDeleteLevel = (itemId: number) => {
    deleteLevel(itemId);
  };

  const handleRefuseDeletion = () => handleCloseOpenedModal();

  const handleCloseOpenedModal = () => {
    setCurrentModal({ type: ModalType.closed, params: null });
  };

  const handleSelectItem = (levelId: number, action: ActionEnum) => {
    if (action === ActionEnum.DELETE) return handleDeleteItem(levelId);

    handleEditItem(levelId);
  };

  const handleDeleteItem = (levelId: number) => {
    setCurrentModal({
      type: ModalType.delete,
      params: {
        id: levelId,
      },
    });
  };

  const handleEditItem = (levelId: number) => {
    setCurrentModal({
      type: ModalType.form,
      params: findLevelDetails(levelId),
    });
  };

  const findLevelDetails = (levelId: number) => {
    return levelsList.find(
      (level) => level.id.toString() === levelId.toString()
    );
  };

  const handleRefuseEdition = () => handleCloseOpenedModal();

  const handleSuccesForm = () => {
    refetch();
    handleCloseOpenedModal();
  };

  useEffect(() => {
    refetch();
  }, [filters]);

  return (
    <>
      <PageTitle
        title="Níveis"
        subtitle="Aqui você pode visualizar todos os níveis cadastrados."
        icon={<IconAccountTree fontSize="medium" color="primary" />}
      />

      <Grid
        container
        xs={12}
        marginTop="24px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item md={3} xs={12}>
          <TextField
            label="Pesquisar"
            placeholder="Pesquise por nível"
            variant="filled"
            color="primary"
            value={filters.query}
            onChange={handleSearchTerm}
            focused
            inputProps={{ style: { color: "#FFFFFF" } }}
          />
        </Grid>

        <Grid item md={5} xs={12} />

        <Grid item md={2} xs={12} textAlign="end">
          <Button
            variant="contained"
            type="button"
            onClick={handleCreateNewLevel}
          >
            Novo cadastro
          </Button>
        </Grid>
      </Grid>

      {isLoading && <SkeletonTable />}

      {!isLoading && (
        <LevelsList
          data={levelsList}
          meta={{
            current_page: meta.current_page,
            last_page: meta?.last_page,
            total: meta?.total,
            per_page: meta?.per_page,
          }}
          onChangePage={(page) => {
            setFilters((activeFilters) => ({
              ...activeFilters,
              page,
            }));
          }}
          onChangePerPage={(perPage) => {
            setFilters((activeFilters) => ({
              ...activeFilters,
              page: 1,
              perPage: Number(perPage),
            }));
          }}
          onSelectItem={handleSelectItem}
          onChangeOrdenation={(column, order) => {
            setFilters((activeFilters) => ({
              ...activeFilters,
              order: order,
              orderBy: column,
            }));
          }}
        />
      )}

      <DeleteModal
        isOpen={currentModal.type === ModalType.delete}
        itemId={currentModal.params?.id}
        onConfirm={handleDeleteLevel}
        onRefuse={handleRefuseDeletion}
        isLoading={isPending}
      />

      <LevelForm
        isOpen={currentModal.type === ModalType.form}
        level={currentModal.params ?? null}
        onCancel={handleRefuseEdition}
        onSuccess={handleSuccesForm}
      />
    </>
  );
};

export default LevelsPage;
