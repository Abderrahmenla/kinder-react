import { useRouter } from 'next/router';
import { FC, ReactNode, useCallback, useState, createContext, useContext, useEffect } from 'react';
import { PolicyProps } from 'src/graphql/types/policiesTypes';

type Props = {
  children: ReactNode;
  policies: PolicyProps[];
};

type SelectPolicyArgs = {
  id: string;
  Slug: string;
};

type PolicyInitialState = {
  selectedPolicy: PolicyProps | null;
  policies: PolicyProps[];
  handleSelectPolicy: (args: SelectPolicyArgs) => void;
};

const PolicyContext = createContext<PolicyInitialState>({
  selectedPolicy: null, // or a default object
  policies: [],
  handleSelectPolicy: () => {
    throw new Error('handleSelectPolicy function must be overridden');
  }
});

const PoliciesContextProvider: FC<Props> = ({ children, policies }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyProps | null>(null);

  const { isFallback } = router;

  useEffect(() => {
    if (!isFallback && slug) {
      const activePolicy = policies?.find((policy) => policy.attributes?.Slug === slug);
      setSelectedPolicy(activePolicy as PolicyProps);
    }
  }, [policies, slug, isFallback]);

  const handleSelectPolicy = useCallback(
    (args: SelectPolicyArgs) => {
      const { id, Slug } = args;
      const selectedPolicy = policies.find((policy) => policy.id === id);
      setSelectedPolicy(selectedPolicy as PolicyProps);
      router.push(`/policies/${Slug}`, undefined, { shallow: true });
    },
    [policies, router]
  );

  return (
    <PolicyContext.Provider
      value={{
        selectedPolicy,
        handleSelectPolicy,
        policies
      }}
    >
      {children}
    </PolicyContext.Provider>
  );
};

export const usePolicyContext = () => useContext(PolicyContext);
export default PoliciesContextProvider;
