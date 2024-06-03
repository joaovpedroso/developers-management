"use client";

import IconCode from "@mui/icons-material/Code";

import { DevelopersList } from "./DevelopersList";
import { ICurrentModal, IDeveloper, ModalType } from "./Developers.types";
import { PageTitle } from "@/components/PageTitle";
import { ChangeEventHandler, useEffect, useState } from "react";
import { ActionEnum, IFilters, IMeta, OrdenationEnum } from "@/types/Common";
import { DeleteModal } from "@/components/DeleteModal";
import { DeveloperForm } from "@/components/Forms/DeveloperForm";
import { Button, Grid, TextField } from "@mui/material";
import { useDevelopers } from "@/hooks";
import { SkeletonTable } from "@/components/SkeletonTable";
import { useDeleteDeveloper } from "@/hooks";
import { toast } from "react-toastify";
import { DEFAULT_PER_PAGE } from "@/constants";

const DevelopersPage = () => {
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

  const {
    data,
    isLoading,
    refetch: refetchDevelopersList,
  } = useDevelopers(filters);

  const { delete: deleteDeveloper, isPending } = useDeleteDeveloper({
    onSuccess: () => {
      toast.success("Desenvolvedor excluido com sucesso!");
      refetchDevelopersList();
      setCurrentModal({
        type: ModalType.closed,
        params: null,
      });
    },
    onError: () => {
      toast.error("Não foi possível excluir.");
    },
  });

  const developersList = data?.data ?? [];
  const meta = data?.meta ?? ({} as IMeta);

  const handleSelectItem = (developerID: number, action: ActionEnum) => {
    if (action === ActionEnum.DELETE) return handleDeleteItem(developerID);

    handleEditItem(developerID);
  };

  const handleDeleteItem = (devId: number) => {
    setCurrentModal({
      type: ModalType.delete,
      params: {
        id: devId,
      },
    });
  };

  const handleCloseOpenedModal = () => {
    setCurrentModal({ type: ModalType.closed, params: null });
  };

  const handleDeleteDeveloper = (itemId: number) => {
    deleteDeveloper(itemId);
  };

  const handleRefuseDeletion = () => handleCloseOpenedModal();

  const findDeveloperDetails = (devId: number) => {
    return developersList.find((dev) => dev.id.toString() === devId.toString());
  };

  const handleEditItem = (devId: number) => {
    setCurrentModal({
      type: ModalType.form,
      params: findDeveloperDetails(devId),
    });
  };

  const handleCreateNewUser = () => {
    setCurrentModal({
      type: ModalType.form,
      params: null,
    });
  };

  const handleRefuseEdition = () => handleCloseOpenedModal();

  const handleSearchTerm = (
    event: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFilters((activeFilters) => ({
      ...activeFilters,
      query: event.target.value,
    }));
  };

  const handleSuccesForm = () => {
    refetchDevelopersList();
    handleCloseOpenedModal();
  };

  useEffect(() => {
    refetchDevelopersList();
  }, [filters]);

  return (
    <>
      <PageTitle
        title="Desenvolvedores"
        subtitle="Aqui você pode visualizar todos os desenvolvedores cadastrados."
        icon={<IconCode fontSize="medium" color="primary" />}
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
            placeholder="Pesquise por desenvolvedor"
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
            onClick={handleCreateNewUser}
          >
            Novo cadastro
          </Button>
        </Grid>
      </Grid>

      {isLoading && <SkeletonTable />}

      {!isLoading && (
        <DevelopersList
          data={developersList}
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
        onConfirm={handleDeleteDeveloper}
        onRefuse={handleRefuseDeletion}
        isLoading={isPending}
      />

      <DeveloperForm
        isOpen={currentModal.type === ModalType.form}
        developer={currentModal.params ?? null}
        onCancel={handleRefuseEdition}
        onSuccess={handleSuccesForm}
      />
    </>
  );
};

export default DevelopersPage;
