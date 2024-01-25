export async function fetchPaylinkByUserId(
  userId: string,
  withoutTrial: boolean,
  isAnnualPlan: boolean
) {
  const res = await fetch(
    `https://api.alphaquest.io/api/app/payment/pay-link-by-user-id/${userId}?withoutTrial=${withoutTrial}&isAnnualPlan=${isAnnualPlan}`
  );

  if (!res.ok) {
    const err = await res.json();
    if (err?.error?.data?.message) throw new Error(err?.error?.data?.message);
    throw new Error(err?.error?.message)
  }
  return res.text();
}
